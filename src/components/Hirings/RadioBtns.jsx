import React from 'react'
import { Label } from '../UI/label'
import { RadioGroup, RadioGroupItem } from "../UI/radio-group"


const RadioBtns = ({ onChange }) => {
  return (
    <RadioGroup defaultValue="parmanentHired" className="flex items-center justify-between" onValueChange={onChange}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="monthlyHired" id="r1" />
        <Label htmlFor="r1">Monthly Hired</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="parmanentHired" id="r2" />
        <Label htmlFor="r2">Permanent Hired</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioBtns
