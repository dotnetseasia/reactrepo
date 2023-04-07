import { Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import { useEffect, useState, useCallback } from "react";

const LongText = (props: {
    content?: any;
    limit?: any;
    }) => {
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);
    if (props.content.length <= props.limit) {
        // there is nothing more to show
        return <div>{props.content}</div>
    }
    if (showAll) {
        // We show the extended text and a link to reduce it
        return <Box sx={{ whiteSpace: "break-spaces", display:'flex', justifyContent:"space-between", alignItems:"center",  }}>
          <Box sx={{width:"90%"}}>{props.content}</Box>

            <Box onClick={showLess} sx={{cursor:"pointer"}}>Read Less</Box>
        </Box>
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = props.content ? props.content.substring(0, props.limit) : "";
    return <Box sx={{ whiteSpace: "break-spaces", display:'flex', justifyContent:"space-between",  alignItems:"center" }}>
        {toShow}...
        <Box onClick={showMore} sx={{cursor:"pointer"}}>Read More</Box>
    </Box>
}

const styles = {
    Note: {
        background: "#FFF9EC",
        borderRadius: "5px",
        padding: "8px"
    }

}

export default function Note(props: any) {
    return (
        <div>
            <Box sx={styles.Note}>
                <LongText content={props.NoteText} limit={100}/>
            </Box>
        </div>
    )
}
