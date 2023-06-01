import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { carService } from '../services/car.service.js'

export function CarIndex() {

    const cars = useSelector(storeState => storeState.carModule.cars)

    useEffect(() => {
        loadCars()
    }, [])

    async function onRemoveCar(carId) {
        try {
            await removeCar(carId)
            showSuccessMsg('Car removed')
        } catch (err) {
            showErrorMsg('Cannot remove car')
        }
    }

    async function onAddCar() {
        const car = carService.getEmptyCar()
        car.vendor = prompt('Vendor?')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }
    }

    async function onUpdateCar(car) {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }
    }

    function onAddToCart(car) {
        console.log(`Adding ${car.vendor} to Cart`)
        addToCart(car)
        showSuccessMsg('Added to Cart')
    }

    function onAddCarMsg(car) {
        console.log(`TODO Adding msg to car`)
    }

    return (
        <div>
            <main>
                {/* <button onClick={onAddCar}>Add Car ⛐</button> */}
                <ul className="car-list">
                    {cars.map(car =>
                        <li className="car-preview" key={car._id}>
                            <div className='station-preview flex column'>
                                <div className='station-img'>
                                    <img src="https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg" alt="" srcset="" />
                                </div>
                                <div className='station-details'>
                                    <h4>{car.name}</h4>
                                    <p>
                                        Lorem ipsum dotur adipis iusto nihil.
                                        {/* <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                        <button onClick={() => { onUpdateCar(car) }}>Edit</button> */}
                                    </p>

                                    {/* <button onClick={() => { onAddCarMsg(car) }}>Add car msg</button>
                                    <button className="buy" onClick={() => { onAddToCart(car) }}>Add to cart</button> */}
                                </div>
                            </div>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}