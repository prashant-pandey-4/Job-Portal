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
        <div className="w-full px-12 sm:px-14 max-w-2xl mx-auto my-12 sm:my-16">
            <Carousel className="w-full">
                <CarouselContent className="-ml-2 sm:-ml-4">
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={`${cat.name}-${index}`} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                                <Button 
                                    onClick={()=>searchJobHandler(cat.name)} 
                                    variant="outline" 
                                    className="w-full rounded-full flex items-center justify-center gap-2 hover:bg-[#6A38C2] hover:text-white transition-all duration-300 shadow-xs h-10 text-xs sm:text-sm font-medium"
                                >
                                    <cat.icon className="w-4 h-4 shrink-0" />
                                    <span className="truncate">{cat.name}</span>
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="-left-10 sm:-left-12 h-8 w-8" />
                <CarouselNext className="-right-10 sm:-right-12 h-8 w-8" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;
