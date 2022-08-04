const inviteHandler = async (roomId,toast) => {
    const shareUrl = `https://${window.location.host}/room/${roomId}`

        try {
            await navigator.clipboard.writeText(shareUrl)
            toast({
                title: 'Link Copied To Clipboard, Now Share With friends',
                status: 'success',
                position: 'bottom-left'
            })
        }catch(error){
            toast({
                title: 'Something Went Wrong, Please Try again',
                status: 'error',
                position: 'bottom-left'
            })
        }
}

export default inviteHandler