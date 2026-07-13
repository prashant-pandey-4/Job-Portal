import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Layout, Server, Database, Palette, Code2 } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Layout },
    { name: "Backend Developer",  icon: Server },
    { name: "Data Science",       icon: Database },
    { name: "Graphic Designer",   icon: Palette },
    { name: "FullStack Developer",icon: Code2 }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/jobs");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={`${cat.name}-${index}`} className="md:basis-1/2 lg:basis-1/3">
                                <Button 
                                    onClick={()=>searchJobHandler(cat.name)} 
                                    variant="outline" 
                                    className="rounded-full flex items-center gap-2 hover:bg-[#6A38C2] hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.name}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
