import Sale from '../../models/Sale';

const checkout = async ({ user, customerId, customerName, cartItems, paymentMode, cardNo, note, receivedFromCustomer }) => {
  try {
    const sale = new Sale({
      CustomerId: customerId,
      CustomerName: customerName,
      UserId: user._id,
      PaymentMode: paymentMode,
      CardNo: cardNo,
      Note: note,
      CartItems: cartItems,
      Status: 0,
      ReceivedFromCustomer: receivedFromCustomer
    });

    await sale.save();

    return { sale };
  }
  catch (err) {
    return { error: err.message }
  }
};

export default checkout;
