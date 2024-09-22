import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';

import { SyntheticEvent, useRef, useState } from 'react';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	fontColors,
	contentWidthArr,
	backgroundColors,
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ChangeSettings = (newSettings: typeof defaultArticleState) => void;

export const ArticleParamsForm = ({
	changeSettings,
}: {
	changeSettings: ChangeSettings;
}) => {
	//Состояние стрелки
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	//Состояние шрифта
	const [stateFont, setStateFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	//Состояние размера шрифта
	const [stateFontSize, setStateFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	//Состояние цвета шрифта
	const [stateColorFont, setStateColorFont] = useState(
		defaultArticleState.fontColor
	);
	//Состояние цвета фона
	const [stateColorBg, setStateColorBg] = useState(
		defaultArticleState.backgroundColor
	);
	//Состояние ширины контента
	const [stateWidthContent, setStateWidthContent] = useState(
		defaultArticleState.contentWidth
	);
	//Ссылка на элемент aside
	const sideBar = useRef(null);
	const [stateButton, setStateButton] = useState(0);
	//Функция сброса параметров формы
	const handleResetForm = () => {
		changeSettings(defaultArticleState);
		setStateFont(defaultArticleState.fontFamilyOption);
		setStateFontSize(defaultArticleState.fontSizeOption);
		setStateColorFont(defaultArticleState.fontColor);
		setStateColorBg(defaultArticleState.backgroundColor);
		setStateWidthContent(defaultArticleState.contentWidth);
	};
	//Функция сабмита формы
	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		changeSettings({
			fontFamilyOption: stateFont,
			fontColor: stateColorFont,
			backgroundColor: stateColorBg,
			contentWidth: stateWidthContent,
			fontSizeOption: stateFontSize,
		});
	};
	// Функция для обработки клика на форму, предотвращающая всплытие события
	function handleClickForm(event: SyntheticEvent) {
		event.stopPropagation();
	}
	// Хук для закрытия меню при клике за его пределами
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: sideBar,
		onClose: () => {
			setStateButton(stateButton + 1);
		},
		onChange: () => {
			if (stateButton === 1) {
				setIsMenuOpen(false);
				setStateButton(0);
			}
		},
	});
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				click={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				ref={sideBar}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onClick={handleClickForm}
					onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={stateFont}
						options={fontFamilyOptions}
						onChange={(selected) => setStateFont(selected)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='размер шрифта'
						selected={stateFontSize}
						options={fontSizeOptions}
						onChange={(selected) => setStateFontSize(selected)}
					/>
					<Select
						title='цвет шрифта'
						selected={stateColorFont}
						options={fontColors}
						onChange={(selected) => setStateColorFont(selected)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={stateColorBg}
						options={backgroundColors}
						onChange={(selected) => setStateColorBg(selected)}
					/>
					<Select
						title='ширина контента'
						selected={stateWidthContent}
						options={contentWidthArr}
						onChange={(selected) => setStateWidthContent(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
