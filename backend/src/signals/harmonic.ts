import { Injectable } from '@nestjs/common';

export interface Point {
  x: number; // time index
  y: number; // price
}

export interface HarmonicPattern {
  type: string; // 'Gartley', 'Butterfly', 'Bat', 'Crab', 'Shark'
  points: Point[]; // X, A, B, C, D points
  direction: 'bullish' | 'bearish';
  confidence: number; // 0-1
  ratios: {
    XAB: number;
    ABC: number;
    BCD: number;
    XAD: number;
  };
}

@Injectable()
export class HarmonicSignalEngine {
  // Tolerance for ratio matching (percentage)
  private readonly RATIO_TOLERANCE = 0.05; // 5%

  // Define pattern ratios (XA is the base leg)
  private readonly PATTERNS = {
    Gartley: {
      bullish: { XAB: 0.618, ABC: [0.382, 0.886], BCD: [1.13, 1.618], XAD: 0.786 },
      bearish: { XAB: 0.618, ABC: [0.382, 0.886], BCD: [1.13, 1.618], XAD: 0.786 }
    },
    Butterfly: {
      bullish: { XAB: 0.786, ABC: [0.382, 0.886], BCD: [1.618, 2.618], XAD: 1.27 },
      bearish: { XAB: 0.786, ABC: [0.382, 0.886], BCD: [1.618, 2.618], XAD: 1.27 }
    },
    Bat: {
      bullish: { XAB: 0.382, ABC: [0.382, 0.886], BCD: [1.618, 2.618], XAD: 0.886 },
      bearish: { XAB: 0.382, ABC: [0.382, 0.886], BCD: [1.618, 2.618], XAD: 0.886 }
    },
    Crab: {
      bullish: { XAB: 0.382, ABC: [0.382, 0.886], BCD: [2.618, 3.618], XAD: 1.618 },
      bearish: { XAB: 0.382, ABC: [0.382, 0.886], BCD: [2.618, 3.618], XAD: 1.618 }
    },
    Shark: {
      bullish: { XAB: [0.382, 0.886], ABC: [1.13, 1.618], BCD: [1.618, 2.24], XAD: [0.886, 1.13] },
      bearish: { XAB: [0.382, 0.886], ABC: [1.13, 1.618], BCD: [1.618, 2.24], XAD: [0.886, 1.13] }
    }
  };

  /**
   * Detect harmonic patterns in price data
   * @param prices Array of price objects {x: timeIndex, y: price}
   * @returns Array of detected harmonic patterns
   */
  detectPatterns(prices: Point[]): HarmonicPattern[] {
    const patterns: HarmonicPattern[] = [];
    
    // Need at least 5 points to form XABCD pattern
    if (prices.length < 5) return patterns;

    // Slide through the price data to find potential patterns
    for (let i = 0; i <= prices.length - 5; i++) {
      const points = prices.slice(i, i + 5);
      
      // Check for each pattern type
      for (const [patternName, patternConfig] of Object.entries(this.PATTERNS)) {
        const bullishPattern = this.validatePattern(points, patternConfig.bullish, 'bullish');
        if (bullishPattern) {
          patterns.push({
            type: patternName,
            points,
            direction: 'bullish',
            confidence: bullishPattern.confidence,
            ratios: bullishPattern.ratios
          });
        }

        const bearishPattern = this.validatePattern(points, patternConfig.bearish, 'bearish');
        if (bearishPattern) {
          patterns.push({
            type: patternName,
            points,
            direction: 'bearish',
            confidence: bearishPattern.confidence,
            ratios: bearishPattern.ratios
          });
        }
      }
    }

    return patterns;
  }

  /**
   * Validate if points match a specific pattern configuration
   */
  private validatePattern(
    points: Point[],
    patternConfig: any,
    direction: 'bullish' | 'bearish'
  ): { confidence: number; ratios: HarmonicPattern['ratios'] } | null {
    // Calculate price legs
    const XA = Math.abs(points[1].y - points[0].y);
    const AB = Math.abs(points[2].y - points[1].y);
    const BC = Math.abs(points[3].y - points[2].y);
    const CD = Math.abs(points[4].y - points[3].y);
    const AD = Math.abs(points[4].y - points[0].y);

    // Avoid division by zero
    if (XA === 0) return null;

    // Calculate ratios
    const XAB = AB / XA;
    const ABC = BC / AB;
    const BCD = CD / BC;
    const XAD = AD / XA;

    // Check if direction matches price movement
    const isValidDirection = this.checkDirection(points, direction);
    if (!isValidDirection) return null;

    // Validate ratios against pattern configuration
    const ratioScore = this.validateRatios(XAB, ABC, BCD, XAD, patternConfig);
    
    if (ratioScore > 0.7) { // 70% threshold for pattern validity
      return {
        confidence: ratioScore,
        ratios: { XAB, ABC, BCD, XAD }
      };
    }

    return null;
  }

  /**
   * Check if the points follow the correct directional pattern
   */
  private checkDirection(points: Point[], direction: 'bullish' | 'bearish'): boolean {
    // For bullish patterns: X<A>B<C>D (price goes down then up then down then up)
    // Actually, let's check the overall trend from X to D
    if (direction === 'bullish') {
      // Bullish: D should be above X (upward trend)
      return points[4].y > points[0].y;
    } else {
      // Bearish: D should be below X (downward trend)
      return points[4].y < points[0].y;
    }
  }

  /**
   * Validate how closely the ratios match the pattern definition
   */
  private validateRatios(
    XAB: number,
    ABC: number,
    BCD: number,
    XAD: number,
    patternConfig: any
  ): number {
    let score = 0;
    const totalChecks = 4;

    // Check XAB ratio
    if (this.ratioWithinTolerance(XAB, patternConfig.XAB)) {
      score += 1;
    }

    // Check ABC ratio (can be a range)
    if (Array.isArray(patternConfig.ABC)) {
      if (this.ratioWithinRange(ABC, patternConfig.ABC[0], patternConfig.ABC[1])) {
        score += 1;
      }
    } else {
      if (this.ratioWithinTolerance(ABC, patternConfig.ABC)) {
        score += 1;
      }
    }

    // Check BCD ratio (can be a range)
    if (Array.isArray(patternConfig.BCD)) {
      if (this.ratioWithinRange(BCD, patternConfig.BCD[0], patternConfig.BCD[1])) {
        score += 1;
      }
    } else {
      if (this.ratioWithinTolerance(BCD, patternConfig.BCD)) {
        score += 1;
      }
    }

    // Check XAD ratio
    if (Array.isArray(patternConfig.XAD)) {
      if (this.ratioWithinRange(XAD, patternConfig.XAD[0], patternConfig.XAD[1])) {
        score += 1;
      }
    } else {
      if (this.ratioWithinTolerance(XAD, patternConfig.XAD)) {
        score += 1;
      }
    }

    return score / totalChecks;
  }

  /**
   * Check if ratio is within tolerance of target
   */
  private ratioWithinTolerance(ratio: number, target: number): boolean {
    const tolerance = target * this.RATIO_TOLERANCE;
    return Math.abs(ratio - target) <= tolerance;
  }

  /**
   * Check if ratio is within a range (with tolerance)
   */
  private ratioWithinRange(ratio: number, min: number, max: number): boolean {
    const tolerance = (max - min) * this.RATIO_TOLERANCE;
    const adjustedMin = min - tolerance;
    const adjustedMax = max + tolerance;
    return ratio >= adjustedMin && ratio <= adjustedMax;
  }

  /**
   * Get the strongest signal from detected patterns
   */
  getStrongestSignal(patterns: HarmonicPattern[]): HarmonicPattern | null {
    if (patterns.length === 0) return null;
    
    // Sort by confidence descending
    return patterns.sort((a, b) => b.confidence - a.confidence)[0];
  }

  /**
   * Generate trading signal based on pattern
   */
  generateSignal(pattern: HarmonicPattern): {
    action: 'buy' | 'sell' | 'hold';
    strength: number; // 0-1
    entry: number;
    stopLoss: number;
    takeProfit: number[];
  } {
    const { points, direction, confidence } = pattern;
    const pointD = points[4]; // D point is the potential reversal point
    
    let action: 'buy' | 'sell' | 'hold' = 'hold';
    let entry = pointD.y;
    let stopLoss: number;
    let takeProfit: number[] = [];

    if (direction === 'bullish') {
      action = 'buy';
      // Stop loss below point X
      stopLoss = points[0].y * 0.99; // 1% below X
      // Take profit levels: 0.382 and 0.618 retracement of AD move
      const ADmove = Math.abs(points[4].y - points[0].y);
      takeProfit = [
        pointD.y - (ADmove * 0.382), // First TP
        pointD.y - (ADmove * 0.618)  // Second TP
      ];
    } else if (direction === 'bearish') {
      action = 'sell';
      // Stop loss above point X
      stopLoss = points[0].y * 1.01; // 1% above X
      // Take profit levels: 0.382 and 0.618 retracement of AD move
      const ADmove = Math.abs(points[4].y - points[0].y);
      takeProfit = [
        pointD.y + (ADmove * 0.382), // First TP
        pointD.y + (ADmove * 0.618)  // Second TP
      ];
    }

    return {
      action,
      strength: confidence,
      entry,
      stopLoss,
      takeProfit
    };
  }
}
