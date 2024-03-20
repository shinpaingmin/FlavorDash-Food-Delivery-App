import { Box } from "@mui/material"


const ImageContainer = (params) => {
  return (
    <Box
        component="img"
        alt={params?.row?.name}
        src={`http://localhost:8000/storage/${params.value}`}
        width="100%"
        height="90%"
        sx={{
            objectFit: "cover",
            borderRadius: "2px"
        }}
    />

  )
}

export default ImageContainer
