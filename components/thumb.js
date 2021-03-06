import React, { useState, useEffect } from "react";
import { Box, Spinner, Image } from "@chakra-ui/react";

const Thumb = ({ file }) => {
    const [loading, setLoading] = useState(false)
    const [thumb, setThumb] = useState(undefined)

    useEffect(() => {
        if (!file) { return; }

        if (file.type.startsWith("image")) {
            console.log(file)
            setLoading(true)
            let reader = new FileReader();

            reader.onloadend = () => {

                setThumb(reader.result)
                setLoading(false)
                console.log(btoa(reader.result))
            };

            reader.readAsDataURL(file);

        } else {
            return
        }
    }, [file])

    useEffect(() => {
        console.log(thumb)
    }, [thumb])
    return (
        <Box display='flex' alignItems='center' justifyContent="center" width={'120px'} height={'120px'}>
            {
                loading ? <Spinner
                    thickness='5px'
                    speed='0.65s'
                    size='xl'
                /> : (
                    <>
                        {thumb && <Image src={thumb}
                            alt={file.name}
                            className="img-thumbnail mt-2"
                            height={'100px'}
                            width={'100px'}
                        />}
                        {/* {video &&
                            <video controls autoPlay loop width={1200} height={700}>
                                <source type="video/mp4" src={thumb} />
                                Your browser does not support the video tag.
                            </video>
                        } */}
                    </>
                )
            }
        </Box>

    )
}

export default Thumb