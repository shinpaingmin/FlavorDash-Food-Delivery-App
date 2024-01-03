

const Filter = ({ category, setCategory, cuisines }) => {
  return (
    <>
        {
            cuisines.map((cuisine) => (
                <label key={cuisine.id} className="custom-container mb-3 block w-max
                        relative capitalize pl-9 cursor-pointer"
                > { cuisine.name }

                    <input type="radio" id={cuisine.name} value={cuisine.name}
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === cuisine.name}
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                    />
                    <span className="custom-radio absolute top-0 left-0 h-[25px] w-[25px]
                                        bg-grey rounded-full"></span>

                </label>
            ))
        }
    </>
  )
}

export default Filter
