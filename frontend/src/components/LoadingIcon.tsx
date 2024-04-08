import { EuiLoadingChart } from "@elastic/eui"

const LoadingIcon = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <EuiLoadingChart size="xl" /> </div>
}

export default LoadingIcon