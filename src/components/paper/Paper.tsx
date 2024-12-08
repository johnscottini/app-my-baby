import { Paper, PaperProps } from '@mui/material';

interface IPaperProps extends PaperProps{
  props: any;
}

const PaperComponent: React.FC<IPaperProps> = ({children, ...props}) => {
    return <Paper {...props}>{children}</Paper>
}

export default PaperComponent;