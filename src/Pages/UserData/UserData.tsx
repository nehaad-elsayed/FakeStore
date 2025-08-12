// import axios from "axios";
// import { useEffect, useState, useCallback } from "react";
// import type { Result } from "../../interfaces/userInterfaces";
// const API_URL = "https://randomuser.me/api/?results=3";

// export default function UserData() {
//   const [users, setUsers] = useState<Result[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const getUsers = useCallback(async () => {
//     setIsLoading(true);
//     await axios.get(API_URL).then((res) => {
//       setUsers(res.data.results);
//       setIsLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   return (
//     <div>
//       <h1>User Data</h1>
//       {isLoading ? <p>Loading...</p> : users.map((user) => (
//         <div key={user.id.value}>
//           <h2>{user.name.first}</h2>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

//& with react query
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Result } from "../../interfaces/userInterfaces";
const API_URL = "https://randomuser.me/api/?results=3";
import LoadingSpinner from "../../Cmponents/LoadingSpinner/LoadingSpinner";


export default function UserData() {
  const getUsers = async () => {
    return await axios.get(API_URL).then((res) => res.data.results);
  };

  const { data, isLoading, isError,error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    // select: (data: Result[]) =>  data, //optional 3shan msh bdefha ella lw h8yr f shakl eldata
    staleTime: 100000,
    gcTime: 100000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 100000,
    // retry: true,
    // retryDelay: 1000,
    // retry(failureCount, error:unknown) {
    //     if(failureCount<3 && error instanceof Error){
    //         return true
    //     }
    //     return false
    // },
  });

  return (
    <div>
      {isLoading && <LoadingSpinner fullScreen={true} />}
      {isError && <p style={{ color: "red" }}>{error.message}</p>}
      {data &&
        data.map((user: Result) => (
          <div key={user.id.value}>
            <h2>{user.name.first}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}
