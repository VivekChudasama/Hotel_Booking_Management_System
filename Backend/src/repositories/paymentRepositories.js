import { Payment } from '../entities/payment.js';

const createPaymentWithSession = async (paymentDataArray, options) => {
    return await Payment.create(paymentDataArray, options);
};

export default {
    createPaymentWithSession
};