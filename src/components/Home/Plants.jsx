import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const Plants = () => {
  const { data: plants } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/plants`)
      if (data.length < 1) {
        return null;
      }
      return data;
    }
  })
  console.log(plants);
  return (
    <Container>
      {
        plants ? <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {
            plants.map(plant => <Card key={plant._id} plant={plant} />)
          }
        </div> : <div className='min-h-screen flex justify-center items-center'>
          <p className='text-xl font-bold'>No data available!</p>
        </div>
      }
    </Container>
  )
}

export default Plants
