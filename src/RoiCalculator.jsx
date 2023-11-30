import { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default function RoiCalculator() {
    const [currencySwitch, setCurrencySwitch] = useState(false);
    const [showContent, setShowContent] = useState(true)
    const [tierValue, setTierValue] = useState(9);
    const [timeFrame,setTimeFrame] = useState(1);
    const [amount,setAmount] = useState(0);
    const randomAmounts = [1000, 100];
    const amountHtml = randomAmounts.map((randomAmount)=>{
        return  <Button key={randomAmount} type='button' size="sm" onClick={()=>updateAmountHandler(randomAmount)} className="rounded btn-light text-muted fw-bold me-1 px-4 py-1 ">${randomAmount}</Button>  
    })
    const periods = [
        {
            label: "1 Day",
            value: 1
        },
        {
            label: "7 Day",
            value: 7
        },
        {
            label: "30 Day",
            value: 30 
        },
        {
            label: "1 Year",
            value: 365
        },
        {
            label: "5 Year",
            value: 1825
        }

    ];
    const tiers = [
        {
            label: 'Tier 1',
            value: 9
        },
        {
            label: 'Tier 2',
            value: 12
        },
        {
            label: 'Tier 3',
            value: 15
        },
        {
            label: 'Tier 4',
            value: 20
        },
        {
            label: 'Tier 5',
            value: 40
        }
    ]
    const tierHtml = tiers.map((singleTier)=>{
         return <Button key={singleTier.value} size="sm" type="button" onClick={()=> tierValueHandler(singleTier.value)} className="rounded-pill btn-light text-muted fw-bold me-1 px-4" active={tierValue== singleTier.value}>{singleTier.label}</Button>
    })
    const periodHTMl = periods.map((period)=>{
        return <Button key={period.value} size="sm" type="button" onClick={()=> frameValueHandler(period.value)}  className="rounded-pill btn-light text-muted fw-bold me-1 px-4" active={timeFrame == period.value}>{period.label}</Button>
        
    })

    function showContentHandler() {
        setShowContent(!showContent);
    }
    function frameValueHandler(value){
        if(typeof value === 'number'){
            setTimeFrame(value);
        }     
    }
    function tierValueHandler(value){
        if(typeof value === 'number'){
            setTierValue(value);
        }
       
    }
    function updateAmountHandler(e){
         setAmount(e)
    }    
    function amountChangeHandler(e){
        if(e.target.value){
            let finalAmount = parseFloat(e.target.value);
            if(!isNaN(finalAmount)) {
                setAmount(finalAmount);
            }
        }else {
            setAmount(0);
        }
    }
    function calculateFutureValue(presentValue, interestRate, period) {
        const r = interestRate / 100;
        const days = period % 30; 
        const months = Math.floor(period / 30) % 12;
        const years = Math.floor(period / 365);
        const totalDays = days + (months * 30) + (years * 365);
        const futureValue = presentValue * Math.pow(1 + r, totalDays / 365);
        return futureValue.toFixed(2);
    }
    let futureValue = 0;

    if(amount > 0 && tierValue > 0 && timeFrame > 0){
        futureValue = calculateFutureValue(amount, tierValue, timeFrame);
    }

    return <div className="calculator">
        <span className='h5 fw-bold'>ROI Calculator</span>
        <Form>
            <div className="d-flex justify-content-end">
                <Label for='changeCurrency' className="me-2 fw-bolder" onClick={() => { setCurrencySwitch(false) }}>CAKE</Label>
                <FormGroup switch color="light">
                    <Input type="switch" className="switch-light" checked={currencySwitch} readOnly role="switch" id="changeCurrency" />
                    <Label className='fw-bolder' for="changeCurrency" onClick={() => { setCurrencySwitch(true) }}>USD</Label>
                </FormGroup>
            </div>
            <div>
                <Input type='text' value={amount} bsSize={'lg'} onChange={(e)=> amountChangeHandler(e)} className='form-control fw-bold fs-4 text-end bg-light' />
                <div className='mt-1'>
                    {amountHtml}
                    <span className='fw-bolder fs-7 float-end text-body-tertiary'>~CAKE 0.000</span>
                </div>
            </div>
            <div className="mt-1">
                <h6 className='my-3'>Timeframe</h6>
                {periodHTMl}
            </div>
            <div className="mt-1">
                <div className='d-flex justify-content-between '>
                    <h6 className='my-3'>Enable Accelerated APY</h6>
                    <div className='fs-4 mt-2'>
                        <FormGroup switch>
                            <Input type="switch" className="switch-light" role="switch" id="changeCurrency" />
                        </FormGroup>
                    </div>
                </div>
                <h6 className="text-body-tertiary">
                    Select Tier
                </h6>
                {tierHtml}
            </div>
            <div className='text-end mt-1'>
                <span className='fw-bolder fs-7'>ROI at Cureent Rates</span>
                <Input type='text' bsSize={'lg'} value={futureValue} readOnly className='form-control fw-bold fs-4 text-end bg-light my-1' />
                <span className='fw-bolder fs-7 my-2'>~0.000 Cake + 0.000000 DON</span>
            </div>
        </Form>
        <div className='text-center mt-3'>
            {showContent ?
                <h6 role="button" className='fw-bold' onClick={showContentHandler}>
                    Hide Details
                    <IoIosArrowDown />
                </h6> :
                <h6 role="button" className='fw-bold' onClick={showContentHandler}>
                    Show Details
                    <IoIosArrowUp />
                </h6>
            }
        </div>

    {
        showContent && <div className="mt-4">
        <div className="d-flex justify-content-between fw-bold">
            <h6 className='fw-bold'>APY</h6>
            <span className="text-gold">{tierValue.toFixed(1)}%</span>
        </div>
        <ul className="ps-3 mt-2 text-body-tertiary fw-bold fs-7">
            <li>
                Calculated based on current rates
            </li>
            <li>
                All fugures are estimates provided for your convenience only,
                and by no means represent guaranted returns.
            </li>
        </ul>
    </div>
    }
        
    </div>
}   