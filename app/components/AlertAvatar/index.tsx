import {
    Text,
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    ButtonGroup,
    Heading,
    Icon,
    CloseIcon,
    AlertDialogCloseButton,
    Button
} from "@gluestack-ui/themed";




export default function AlertAvatar({ showAlertDialog, setShowAlertDialog }: any) {
    return (
        <AlertDialog
            isOpen={showAlertDialog}
            onClose={() => setShowAlertDialog(false)}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent
                bg='$secondaryBg'
            >
                <AlertDialogHeader>
                    <Heading
                        size='lg'
                        color='white'
                    >Missing Information</Heading>
                    <AlertDialogCloseButton onPress={() => setShowAlertDialog(false)}>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text
                        color='white'
                        size='sm'>
                        Please make sure to choose an avatar and enter a username before continuing.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => setShowAlertDialog(false)}
                            bg='$redButton'
                        >
                            <Text
                                color='white'
                            >Close</Text>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}