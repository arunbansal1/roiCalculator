import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {decrement,increment,incrementByAmount,incrementAsync,selectCount} from './counterSlice';
import styles from './Counter.module.css';

export function Counter(){
 const count = useSelector(selectCount)
 const dispatch =useDispatch()
 return (
    <div>
        <div className={styles.row}>
            <button
            className={styles.button}
            aria-label="increment Value"
            onClick={() => dispatch(increment())}>
                +
            </button>
            <span className={styles.value}>{count}</span>
            <button
            className={styles.button}
            aria-label='decrement Value'
            onClick={() => dispatch(decrement())}>
                -
            </button>
        </div>
    </div>
 )
}