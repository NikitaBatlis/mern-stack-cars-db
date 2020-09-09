import React from 'react';
import Table from 'react-bootstrap/Table';

export default function Cars({cars, deleteCar, editCar}) {
    return(
        <Table hover variant="dark" size="md" className="table" >
        <thead className="tableHead">
            <tr>
            <th>Model</th>
            <th>Make</th>
            <th>Color</th>
            <th>Registration</th>
            <th>Owner</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {cars.map(car => (
                <tr key={car._id}>
                    <td>{car.model}</td>
                    <td>{car.make}</td>
                    <td>{car.color}</td>
                    <td>{car.registration}</td>
                    <td>{car.owner}</td>
                    <td className="tableButtons">
                        <button onClick={() => editCar(car)}>Edit</button>
                        <button onClick={() => deleteCar(car._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
        </Table>
    )
}
