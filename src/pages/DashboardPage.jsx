import ProyectDisplay from '../components/ui/ProyectDisplay'
import Input from '../components/ui/Input'
import AddNewProyect from '../components/ui/AddNewProyect'
import { useEffect, useState } from 'react'
import NewProyectModal from '../components/ui/NewProyectModal'
import { useAuth } from '../hooks/useAuth'
import { proyectService } from '../services/proyectService'
function DashboardPage() {

  const [showNewProyectModal, setShowNewProyectModal] = useState(false)
  const [projects, setProjects] = useState([])
  const { logout } = useAuth()


  //   useEffect(() => {
  //       const fetchProjects = async () => {
  //         const data = await proyectService.getProyectById(16)
  //         setProjects(data.data)
  //       }
  //       fetchProjects()
  //   }, [])

  //   useEffect(() => {
  //     console.log(projects);

  // }, [projects])

  const handleModalView = () => {
    setShowNewProyectModal(prev => !prev)
  }
  const handleCreateNewProyect = () => {
    setShowNewProyectModal(prev => !prev)
  }
  return (
    <div className="flex flex-col sm:flex-row h-screen w-screen bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="w-full sm:w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className="flex h-full w-full flex-col gap-3 bg-slate-50 p-8">
        <div className="flex w-full justify-end">
          <p className="text-sm">
            <button
              onClick={logout}
              className="hover:text-red-600 hover:scale-125 hover:font-semibold duration-300"
            >
              Log out
            </button>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Admin</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <h2 className="text-2xl font-semibold">Hi, Luis!</h2>
            <Input
              type="text"
              className="w-full sm:w-64 rounded-lg border-2 border-gray-100 focus:border-none focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-orange-600">Your projects</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <AddNewProyect handleClick={handleModalView} />
            <div className="w-full overflow-x-auto flex ">
              <div className="flex min-w-max gap-5">
                <ProyectDisplay proyectName="Athlex" />
                <ProyectDisplay proyectName="Athlex" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-6 bg-white"></div>

      {showNewProyectModal && (
        <NewProyectModal
          handleClickModal={handleModalView}
          handleSubmit={handleCreateNewProyect}
        />
      )}
    </div>


  )
}

export default DashboardPage

