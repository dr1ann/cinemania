'use client'

interface VidTrailerProps   {
    selectedMovieKey?: string | null
    isVisible: boolean;
    onClose?: () => void;
  }
const VidTrailer: React.FC<VidTrailerProps> = ({ selectedMovieKey, isVisible, onClose }) => {
   


 
  if (!selectedMovieKey) {
       
      return null; // Return null or some default content when no video is selected
    
    } 
    return (
        <div>
          {isVisible ?
            <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-[99999] flex justify-center items-center">
          
         <div className='h-screen w-full bg-opacity-25 z-[100000]   mx-auto flex justify-center items-center'>
         <div className='flex items-center justify-center relative mx-4 sm:mx-0 h-[50%] w-full sm:w-[80%] sm:h-[55%] md:w-[70%] md:h-[60%] lg:w-[55%] lg:h-[65%]  '>
          <button
              className='absolute top-[-30px] text-[0.80rem] md:text-[0.95rem] rounded-full bg-[#1a1a1a] w-fit h-fit px-2  pb-[1px] right-0 z-[9999999] mx-auto'
              onClick={onClose}
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedMovieKey}`}
              className='object-contain responsive-iframe w-full h-full'
              allowFullScreen
              
            />
          </div>
        </div>
        </div>
        :
        ''
        }
      </div>
    );
  };
  export default VidTrailer