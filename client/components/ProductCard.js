import React from 'react'

export default function ProductCard({ productId, productImage, productName, productPrice, cardLocation, removeFromWishlist, WishlistItemId, userId }) {

  return <div className="card bm--card-equal-height">
    <div className="card-image">
      <figure className="image is-4by3">
        <a href={`/products/${productId}`}><img src={productImage} alt={`${productName} image`} /></a>
      </figure>
    </div>
    <div className="cardContent">
      <p>{productName}</p>
      <p>£{productPrice}</p>
    </div>
    <footer className='card-footer'>
      {cardLocation === 'Saved' && <button className="button is-warning" onClick={() => removeFromWishlist(WishlistItemId, userId)}>Remove from Saved Items</button>}
    </footer>
  </div>
}