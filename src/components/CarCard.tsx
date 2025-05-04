
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Icon from "./ui/icon";

interface CarCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  seats: number;
  transmission: string;
}

const CarCard = ({ id, name, category, image, price, seats, transmission }: CarCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs py-1 px-2 rounded">
          {category}
        </div>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Icon name="Users" className="h-4 w-4 mr-1" />
            <span>{seats} мест</span>
          </div>
          <div className="flex items-center">
            <Icon name="Cog" className="h-4 w-4 mr-1" />
            <span>{transmission}</span>
          </div>
        </div>
        
        <div className="text-primary font-semibold">
          {price.toLocaleString()} ₽/день
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between">
        <Link to={`/car/${id}`}>
          <Button variant="outline" size="sm">
            Подробнее
          </Button>
        </Link>
        <Button size="sm" className="flex items-center">
          <Icon name="ShoppingCart" className="mr-1 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
