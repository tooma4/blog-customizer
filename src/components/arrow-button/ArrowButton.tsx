import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type StateProps = {
	isOpen?: boolean;
	click?: () => void;
};

export const ArrowButton = (props: StateProps) => {
	function click() {
		props.click?.();
		console.log('клик');
	}
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={click}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(
				styles.container,
				props.isOpen ? styles.container_open : ''
			)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(props.isOpen ? styles.arrow_open : styles.arrow)}
			/>
		</div>
	);
};
