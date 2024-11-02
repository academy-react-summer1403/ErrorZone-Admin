import { useMutation } from "@tanstack/react-query";
import http from "../../core/services/interceptor"
import { useNavigate } from "react-router-dom"
import { setItem } from "../services/common/storage.services";

const navigate = useNavigate()

export const loginSubmit = (value) => {
    useMutation({
        mutationFn: async () => await http.post("/Sign/Login", value),
        onSuccess: (e) => {
            console.log(e);
            navigate("/")
        }
    })
}
