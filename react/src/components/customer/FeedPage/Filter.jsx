

const Filter = ({ category, setCategory, id, name }) => {
  return (
    <>


                <label key={id} className="custom-container mb-3 block w-max
                        relative capitalize pl-9 cursor-pointer"
                > { name }

                    <input type="radio" id={name} value={name}
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === name}
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                    />
                    <span className="custom-radio absolute top-0 left-0 h-[25px] w-[25px]
                                        bg-grey rounded-full"></span>

                </label>


    </>
  )
}

export default Filter
