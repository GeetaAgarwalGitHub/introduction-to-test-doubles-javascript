/* eslint-disable*/
const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const messenger = require('./bubble_tea_messenger');
const emailSpy = jest.spyOn(messenger, 'sendBubbleTeaOrderRequestEmail');

let dummyPaymentDetails;

beforeEach(() => {
  dummyPaymentDetails = {
    name: 'Another person',
    address: '123 Some Street',
    debitCard: {
      digits: '777777',
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test('test successful bubble tea order request when using a spy', () => {
  // Arrange
  const bubbleTeaRequest = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType.PEACHICETEA,
    },
  };

  // Act
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  // Assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(emailSpy).toHaveBeenCalledWith(orderRequest);
  expect(emailSpy).toHaveBeenCalledTimes(1);
});


describe("This is a parameterised test; should generate  bubble tea based on input provided", () => {
  test.each`
  bubbleTeaType
  ${"JASMINEMILKTEA"}
  ${"OOLONGMILKTEA"}
  ${"MATCHAMILKTEA"}
  ${"PEACHICETEA"}
  ${"LYCHEEICETEA"}
`('test successful for $bubbleTeaType bubble tea order request when using a spy', ({bubbleTeaType}) => {
  // Arrange
  const bubbleTeaRequest = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType,
    },
  };
  // Act
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  // Assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(emailSpy).toHaveBeenCalledWith(orderRequest);
  expect(emailSpy).toHaveBeenCalledTimes(1);
});
});