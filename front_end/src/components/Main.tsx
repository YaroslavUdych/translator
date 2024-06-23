import './Main.css'
import TextToTranslate from './TextToTranslate'
import TranslatedText from './TranslatedText'
import Loader from '../UI/Loader'
import SelectLanguage from './SelectLanguage'
import ListOfResults from './ListOfResults'

const Main: React.FC = function () {
	return (
		<div className="main-wrap">
			<SelectLanguage />
			<section className="inputs-wrap">
				<TextToTranslate />
				<Loader />
				<TranslatedText />
			</section>
			<ListOfResults />
		</div>
	)
}

export default Main
