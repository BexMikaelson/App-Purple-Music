import {
    HomeIcon,
    MagnifyingGlassIcon,
    ListBulletIcon,
    
} from '@heroicons/react/24/outline'

const Sidebar = () => {
    return (
      <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
        <h1>Sidebar</h1>
        <div>
          <button className='flex items-center space-x-2 
          hover:text-purple-500' >
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 hover:text-purple-500'>
            <MagnifyingGlassIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 hover:text-purple-500'>
            <ListBulletIcon className="h-5 w-5" />
            <p>Your Library</p>
          </button>
          
        </div>
        <hr className='border-t-[0.1px] border-gray-700' />
        
      </div>
    );
}
 
export default Sidebar;