const Rating = ({ value, text, color }) => {
  const starValues = [1, 2, 3, 4, 5]
  return (
    <div className="rating">
      {starValues.map((star, index) => (
        <span key={index}>
          <i style={{color}}
            className={
              value >= star
                ? 'fa-sharp fa-solid fa-star'
                : value >= star - 0.5
                  ? 'fa-solid fa-star-half-stroke'
                  : 'fa-sharp fa-regular fa-star'
            }
          />
        </span>
      ))}
      <span> {text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#FFA41C'
}

export default Rating
