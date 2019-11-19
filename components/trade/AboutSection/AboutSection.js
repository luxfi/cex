import { useState } from "react"
import {
    Typography,
    Box,
    TextField,
    Link,
} from "@material-ui/core";

const AboutSection = () => {
    const [expandedText, setExpandedText] = useState(false)
    return (
        <Box mt={6} mb={6}>
            <Typography variant="subtitle2" gutterBottom>
                <Box fontWeight="fontWeightBold">ABOUT</Box>
            </Typography>
            <Typography variant="h5" gutterBottom>
                <Box fontWeight="fontWeightBold">
                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat
                </Box>
            </Typography>
            <Typography gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            {expandedText ? (
                <React.Fragment>
                    <Typography gutterBottom>
                        Diam quis enim lobortis scelerisque. Dignissim convallis
                        aenean et tortor at risus viverra. Consectetur
                        adipiscing elit ut aliquam. Velit laoreet id donec
                        ultrices tincidunt. Pellentesque massa placerat duis
                        ultricies lacus sed. Morbi tristique senectus et netus
                        et. Massa tincidunt dui ut ornare lectus sit amet est.
                        Tellus molestie nunc non blandit massa. Convallis tellus
                        id interdum velit laoreet id. Massa eget egestas purus
                        viverra accumsan in nisl nisi scelerisque. Volutpat
                        consequat mauris nunc congue nisi vitae suscipit tellus.
                        Consequat interdum varius sit amet mattis vulputate
                        enim. Vitae congue eu consequat ac felis donec et odio
                        pellentesque. Pellentesque elit eget gravida cum.
                        Convallis tellus id interdum velit. Pretium vulputate
                        sapien nec sagittis aliquam malesuada bibendum arcu.
                        Ullamcorper eget nulla facilisi etiam dignissim diam
                        quis enim.
                    </Typography>
                    <Typography gutterBottom>
                        Odio aenean sed adipiscing diam donec. In fermentum
                        posuere urna nec tincidunt. Mi quis hendrerit dolor
                        magna eget est lorem ipsum. Consectetur adipiscing elit
                        pellentesque habitant morbi tristique senectus et netus.
                        Sed egestas egestas fringilla phasellus faucibus. Est
                        ultricies integer quis auctor elit sed vulputate mi sit.
                        Eu facilisis sed odio morbi quis. Sapien faucibus et
                        molestie ac feugiat. Rhoncus mattis rhoncus urna neque
                        viverra justo nec ultrices. Consequat nisl vel pretium
                        lectus quam id leo. Aliquet risus feugiat in ante metus
                        dictum at tempor commodo. Felis eget nunc lobortis
                        mattis aliquam faucibus purus. Elit ut aliquam purus
                        sit. Leo vel orci porta non. Massa id neque aliquam
                        vestibulum morbi blandit cursus risus.
                    </Typography>
                    <Link
                        color="inherit"
                        onClick={() => setExpandedText(false)}
                    >
                        <Box fontWeight="fontWeightBold">Hide...</Box>
                    </Link>
                </React.Fragment>
            ) : (
                <Link color="inherit" onClick={() => setExpandedText(true)}>
                    <Box fontWeight="fontWeightBold">Read More...</Box>
                </Link>
            )}
        </Box>
    )
}

export default AboutSection
