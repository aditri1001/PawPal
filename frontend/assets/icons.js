import { AntDesign, Feather, Ionicons} from "@expo/vector-icons";

export const icons = {
    home: (props)=> <AntDesign name="home" size={26} {...props} />,
    cats: (props)=> <Ionicons name="paw-outline" size={26} {...props} />,
    dogs: (props)=> <Ionicons name="paw" size={26} {...props} />,
    services: (props)=> <Ionicons name="cart-outline" size={26} {...props} />,
    profile: (props)=> <AntDesign name="user" size={26} {...props} />,
}
