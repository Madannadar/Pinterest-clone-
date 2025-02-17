import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";

const Cart = () => {
  const { cart, removeFromCart } = PinData();

  return (
    <div className="p-6 w-full">
      <h1 className="text-center text-2xl font-bold mt-4">Your liked history</h1>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {cart && cart.length > 0 ? (
          cart.map((pin) => (
            <div key={pin._id} className="relative">
              <PinCard pin={pin} />
              <button
                onClick={() => removeFromCart(pin._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No pins in the liked history</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
