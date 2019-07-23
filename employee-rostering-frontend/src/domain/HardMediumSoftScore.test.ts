/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import HardMediumSoftScore, { isScoreZero, getHardMediumSoftScoreFromString, convertHardMediumSoftScoreToString } from './HardMediumSoftScore';

describe('HardMediumSoftScore operations', () => {
  it("isScoreZero should return true if all components are zero", () => {
    const score: HardMediumSoftScore = {
      hardScore: 0,
      mediumScore: 0,
      softScore: 0
    };

    expect(isScoreZero(score)).toEqual(true);
  });

  it("isScoreZero should return false if not all components are zero", () => {
    const score: HardMediumSoftScore = {
      hardScore: 1,
      mediumScore: 1,
      softScore: 1
    };

    expect(isScoreZero(score)).toEqual(false);
    score.hardScore = 0;

    expect(isScoreZero(score)).toEqual(false);

    score.mediumScore = 0;
    expect(isScoreZero(score)).toEqual(false);

    score.softScore = 0;
    score.mediumScore = 1;
    expect(isScoreZero(score)).toEqual(false);
  });

  it("getHardMediumSoftScoreFromString should work correctly", () => {
    const scoreString = "-5hard/-4medium/10soft";
    const expectedScore: HardMediumSoftScore = {
      hardScore: -5,
      mediumScore: -4,
      softScore: 10
    };
    const actualScore = getHardMediumSoftScoreFromString(scoreString);

    expect(actualScore).toEqual(expectedScore);
  });

  it("convertHardMediumSoftScoreToString should work correctly", () => {
    const score = {
      hardScore: 0,
      mediumScore: 0,
      softScore: 0,
    }

    expect(convertHardMediumSoftScoreToString(score)).toEqual("0");

    score.hardScore = -5;
    expect(convertHardMediumSoftScoreToString(score)).toEqual("-5 Hard");

    score.mediumScore = -3;
    expect(convertHardMediumSoftScoreToString(score)).toEqual("-5 Hard/-3 Medium");

    score.softScore = 5;
    expect(convertHardMediumSoftScoreToString(score)).toEqual("-5 Hard/-3 Medium/5 Soft");

    score.mediumScore = 0;
    expect(convertHardMediumSoftScoreToString(score)).toEqual("-5 Hard/5 Soft");

    score.hardScore = 0;
    expect(convertHardMediumSoftScoreToString(score)).toEqual("5 Soft");

    score.softScore = 0;
    score.mediumScore = 5
    expect(convertHardMediumSoftScoreToString(score)).toEqual("5 Medium");
  });
});