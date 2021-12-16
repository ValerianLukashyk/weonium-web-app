import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

export default class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
        video: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }
        if (nextProps.file.name.startsWith("video")) {
            this.setState({ loading: true }, () => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState({ loading: false, video: reader.result });
                };

                reader.readAsDataURL(nextProps.file);
            });
        } else if (nextProps.file.name.startsWith("image")) {
            this.setState({ loading: true }, () => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState({ loading: false, thumb: reader.result });
                };

                reader.readAsDataURL(nextProps.file);
            });
        } else {
            return
        }

    }

    render() {
        const { file } = this.props;
        const { loading, thumb, video } = this.state;

        if (!file) { return null; }
        console.log(file)

        return (
            <Box display='flex' alignItems='center' justifyContent="center" width={'120px'} height={'120px'}>
                {
                    loading ? <Spinner
                        thickness='5px'
                        speed='0.65s'
                        size='xl'
                    /> : (
                        <>
                            {thumb && <img src={thumb}
                                alt={file.name}
                                className="img-thumbnail mt-2"
                                height={'100px'}
                                width={'100px'}
                            />}
                            {video &&
                                <video controls autoPlay loop width={1200} height={700}>
                                    <source type="video/mp4" src={thumb} />
                                    Your browser does not support the video tag.
                                </video>
                            }
                        </>
                    )
                }
            </Box>

        )
    }
}