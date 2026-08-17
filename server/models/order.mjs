import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

   
    customer: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    
    shippingAddress: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      postalCode: {
        type: String,
        required: true,
        trim: true,
      },
    },

   
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        productName: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        image: {
          type: String,
          default: "",
        },
      },
    ],

   
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    delivery: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

   
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery"],
      default: "Cash on Delivery",
    },

  
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);

export default Order;