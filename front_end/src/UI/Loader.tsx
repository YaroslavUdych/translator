import './Loader.css'
import { useTranslation } from '../context/TranslationContext'

const Loader: React.FC = () => {
	const { loading } = useTranslation()

	return <div className="loader-wrap">{loading && <span className="dot-pulse"></span>}</div>
}

export default Loader
