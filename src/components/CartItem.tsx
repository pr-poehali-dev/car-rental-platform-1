
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Icon from "./ui/icon";
import { Link } from "react-router-dom";

interface CartItemProps {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  days: number;
  startDate: string;
  endDate: string;
  onRemove: (id: number) => void;
  onUpdateDays: (id: number, days: number) => void;
}

const CartItem = ({
  id,
  name,
  category,
  image,
  price,
  days,
  startDate,
  endDate,
  onRemove,
  onUpdateDays
}: CartItemProps) => {
  const [daysCount, setDaysCount] = useState(days);

  const handleDaysChange = (value: number) => {
    if (value >= 1) {
      setDaysCount(value);
      onUpdateDays(id, value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row border rounded-lg p-4 mb-4">
      <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
        <div className="relative h-40 md:h-32 bg-gray-100 rounded">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute top-2 left-2 bg-primary text-white text-xs py-1 px-2 rounded">
            {category}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/car/${id}`} className="text-lg font-medium hover:text-primary transition-colors">
              {name}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              {startDate} — {endDate}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500"
            onClick={() => onRemove(id)}
          >
            <Icon name="X" className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-3 sm:mb-0">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleDaysChange(daysCount - 1)}
              disabled={daysCount <= 1}
            >
              <Icon name="Minus" className="h-3 w-3" />
            </Button>
            
            <Input
              type="number"
              min="1"
              value={daysCount}
              onChange={(e) => handleDaysChange(parseInt(e.target.value) || 1)}
              className="w-16 mx-2 h-8 text-center"
            />
            
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleDaysChange(daysCount + 1)}
            >
              <Icon name="Plus" className="h-3 w-3" />
            </Button>
            
            <span className="ml-2 text-sm text-gray-500">дней</span>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {price.toLocaleString()} ₽ × {daysCount} {daysCount === 1 ? 'день' : daysCount >= 2 && daysCount <= 4 ? 'дня' : 'дней'}
            </div>
            <div className="text-lg font-semibold text-primary">
              {(price * daysCount).toLocaleString()} ₽
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
