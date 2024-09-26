import ProyectDisplay from "./ProyectDisplay";
import UserAvailableModal from "./UserAvailableModal";
import AssignedTask from "./AssignedTask";
import useFetchStaff from "../../hooks/useFetchStaff";
import { default as axios } from "../../api/axiosInstace";
import { useState } from "react";
import { proyectService } from "../../services/proyectService";

function NewProyectModal({ handleClickModal, handleSubmit }) {
    const { staff, loading, error, refetch } = useFetchStaff();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState("");
    const [newProyect, setNewProyect] = useState({
        id: null,
        nombre: "",
        descripcion: "",
        foto: "",
        usuarios: users,
        tareas: tasks,
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewProyect((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputTask = (e) => {
        setTask(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveTask();
        }
    };

    const deleteTask = (e) => {
        const { id } = e.target;
        setTasks((prevData) => {
            const updatedTasks = prevData.filter(task => task.nombre !== id);
            setNewProyect((prevData) => ({
                ...prevData,
                tareas: updatedTasks,
            }));
            setTask("");
            return updatedTasks;
        });
    };

    const saveTask = () => {
        setTasks((prevData) => {
            const updatedTasks = [...prevData, { nombre: task, estadoTarea: 1 }];
            setNewProyect((prevData) => ({
                ...prevData,
                tareas: updatedTasks,
            }));
            setTask("");
            return updatedTasks;
        });
    };

    const toggleAddUser = (id, state) => {
        if (state) {
            setUsers((prevData) => {
                const updatedUsers = [...prevData, { id: id }];
                setNewProyect((prevData) => ({ ...prevData, usuarios: updatedUsers }));
                return updatedUsers;
            });
        } else {
            setUsers((prevData) => {
                const updatedUsers = prevData.filter(user => user.id !== id);
                setNewProyect((prevData) => ({ ...prevData, usuarios: updatedUsers }));
                return updatedUsers;
            });
        }
    };

    const handleCreateProyect = async () => {
        const response = await proyectService.createProyect(newProyect);
        if (await response.status === 201) {
            console.log("Proyecto guardado");
            handleClickModal();
        }
    };

    const handleCloseModal = () => {
        handleCreateProyect(); // Guardar el proyecto al cerrar el modal
    };

    return (
        <div className="absolute w-screen h-screen backdrop-blur-sm lg:grid lg:grid-cols-4 lg:grid-rows-6">
            <div className="w-[900px] mx-auto lg:h-full h-auto bg-white lg:shadow-2xl rounded-[24px] p-5 lg:p-10 lg:row-start-2 lg:row-end-7 lg:col-start-2 lg:col-end-4 flex flex-col relative">

                {/* Ajuste del botón de cerrar con ícono SVG */}
                <div className="absolute top-5 right-5 cursor-pointer" onClick={handleCloseModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        fill="rgba(0, 0, 0, 0.08)" // Color negro al 8%
                    >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-1.414l-2-2L4.586 6l2 2l-2 2L6 11.414l2-2l2 2L11.414 10l-2-2l2-2L10 4.586z"></path>
                    </svg>
                </div>

                {/* Ajuste del input para el nombre del proyecto */}
                <div className="w-full">
                    <input
                        name="nombre"
                        type="text"
                        className="bg-transparent text-2xl lg:text-4xl focus:outline-none"
                        placeholder="New Proyect"
                        onChange={handleChange}
                    />
                </div>

                <div className="w-[900px] grid grid-cols-1 lg:grid-cols-3 grid-rows-1 h-full mt-5 gap-5 overflow-y-auto">
                    <div className="col-start-1 col-end-4 lg:col-start-1 lg:col-end-3 grid grid-cols-1 lg:grid-cols-2 grid-rows-[175px_auto] lg:gap-5">
                        <div className="flex flex-col lg:flex-row gap-10 col-start-1 col-end-4">
                            <ProyectDisplay label="Select Photo" icon="bx bx-upload" />
                            <div>
                                <textarea
                                    name="descripcion"
                                    value={newProyect.descripcion}
                                    onChange={handleChange}
                                    className="border-[2px] w-[175px] h-[175px] p-3 border-[rgba(0,0,0,0.08)] rounded-[24px] text-left resize-none focus:outline-none"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                        </div>

                        <div className="bg-white mt-10 lg:mt-0 w-full h-full col-start-1 col-end-4 row-start-2 row-end-3 rounded-[24px] overflow-y-auto flex flex-col gap-5">
                            <div className="flex gap-5 flex-col lg:flex-row">
                                <input
                                    type="text"
                                    name="task"
                                    className="w-full border-[2px] border-[rgba(0,0,0,0.08)] rounded-[24px] py-3 px-5 focus:outline-none"
                                    placeholder="Add task"
                                    value={task}
                                    onChange={handleInputTask}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <div className="bg-white border-[2px] border-[rgba(0,0,0,0.08)] w-full h-full rounded-[24px] overflow-y-auto flex flex-col gap-5 p-5">
                                {tasks.map((task, index) => (
                                    <AssignedTask taskName={task.nombre} key={index} deleteTask={deleteTask} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-start-1 col-end-4 lg:col-start-3 lg:col-end-4 bg-white border-[2px] border-[rgba(0,0,0,0.08)] rounded-[24px] grid grid-rows-[auto_auto_auto] w-[175px]">
                        <p className="w-full text-center p-5 text-lg lg:text-xl text-orange-600">
                            Staff Available
                        </p>
                        <div className="overflow-y-auto flex flex-col gap-5 p-5">
                            {staff.map((user) => (
                                <UserAvailableModal
                                    name={user.nombre + " " + user.apellido}
                                    key={user.id}
                                    handleClick={toggleAddUser}
                                    id={user.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProyectModal;
