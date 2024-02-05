export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updatePrices = (state) => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  state.itemsPrice = addDecimals(itemsPrice)

  // Calculate shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10
  state.shippingPrice = addDecimals(shippingPrice)

  // Calculate tax price
  const taxPrice = 0.15 * itemsPrice
  state.taxPrice = addDecimals(taxPrice)

  // Calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice
  state.totalPrice = addDecimals(totalPrice)

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
