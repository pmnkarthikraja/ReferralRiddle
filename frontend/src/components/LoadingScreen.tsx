import { EuiLoadingChart } from "@elastic/eui"

const LoadingScreen = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <EuiLoadingChart size="xl" /> </div>
}
export default LoadingScreen