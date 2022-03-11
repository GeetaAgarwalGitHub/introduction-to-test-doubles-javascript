const getRandomBubbleTeaType = require("./bubble_tea_roulette_service");

test("should generate random bubble tea", () => {
  // Arrange
  // Stub to calls to Math.random to return 0.2
  jest.spyOn(global.Math, "random").mockReturnValue(0.2);

  // Act
  const bubbleTea = getRandomBubbleTeaType();

  // Assert
  expect(bubbleTea).toBe("JASMINEMILKTEA");

  // Restore the default Math.random
  jest.spyOn(global.Math, "random").mockRestore();
});

describe("This is a parameterised test; should generate  bubble tea based on input provided", () => {
  it.each([
    [0, "OOLONGMILKTEA"],
    [0.2, "JASMINEMILKTEA"],
    [0.4, "MATCHAMILKTEA"],
    [0.6, "PEACHICETEA"],
    [0.8, "LYCHEEICETEA"],
  ])("Passing a value of  %p - Expecting : %p", (randomValue, result) => {
    jest.spyOn(global.Math, "random").mockReturnValue(randomValue);

    // Act
    const bubbleTea = getRandomBubbleTeaType();

    // Assert
    expect(bubbleTea).toBe(result);

    // Restore the default Math.random
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
