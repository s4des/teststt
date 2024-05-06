ctx = canvas.getContext('2d');
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// draw game name
		ctx.font = fontGameName;
		ctx.fillStyle = '#404040';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(gameName, canvas.width / 2, yGameName / 2);

		// draw guide
		ctx.font = fontGameGuide;
		ctx.fillStyle = '#404040';
		ctx.textAlign = 'left';
		const yGuide = heightGameName + marginY / 2 + row * (sizeOfOneSquare + distance) + marginY / 2 + lineHeightGuideText * 2;

		// draw note
		const yNote = drawWrappedText(ctx, gameGuide, yGuide, canvas.width - marginX, lineHeightGuideText, true, marginX, marginText);

		drawWrappedText(ctx, gameNote, yNote + 10, canvas.width - marginX, lineHeightGuideText, true, marginX, marginText);

		// draw all squares
		for (let i = 0; i < col; i++) {
			for (let j = 0; j < row; j++) {
				const { xOutSide, yOutSide, xInSide, yInSide } = getPositionOfSquare(i, j, sizeOfOneSquare, distance, marginX, marginY, lineWidth, heightGameName);
				drawBorderSquareRadius(
					ctx,
					xOutSide,
					yOutSide,
					sizeOfOneSquare,
					sizeOfOneSquare,
					radius,
					lineWidth,
					'#919191',
					true
				);

				drawBorderSquareRadius(
					ctx,
					xInSide,
					yInSide,
					sizeOfOneSquare - lineWidth * 2,
					sizeOfOneSquare - lineWidth * 2,
					radius / 2,
					lineWidth,
					backgroundColor,
					true
				);
			}
		}
	}

	if (!canvasHightLight) {
		// if there's no canvasHightLight, then of course ctxHightLight, canvasNumbers and ctxNumbers doesn't either
		canvasHightLight = createCanvas(canvas.width, canvas.height);
		ctxHightLight = canvasHightLight.getContext('2d');
		canvasNumbers = createCanvas(canvas.width, canvas.height);
		ctxNumbers = canvasNumbers.getContext('2d');
	}

	// draw numbers
	let isWin = null;
	if (numbers.length) {
		ctxNumbers.font = fontNumbers;
		ctxNumbers.fillStyle = '#f0f0f0';
		ctxNumbers.textAlign = 'center';
		ctxNumbers.textBaseline = 'middle';
		for (let i = 0; i < col; i++) {
			const { xOutSide, yOutSide, xInSide, yInSide } = getPositionOfSquare(i, tryNumber, sizeOfOneSquare, distance, marginX, marginY, lineWidth, heightGameName);
			// draw background of square
			drawBorderSquareRadius(
				ctx,
				xInSide,
				yInSide,
				sizeOfOneSquare - lineWidth * 2,
				sizeOfOneSquare - lineWidth * 2,
				radius / 2,
				lineWidth,
				'#a3a3a3',
				true
			);
			// draw number
			const x = xOutSide + sizeOfOneSquare / 2;
			const y = yOutSide + sizeOfOneSquare / 2;
			ctxNumbers.fillText(numbers[i], x, y);

			// yellow || green 
			if (
				answer.includes(numbers[i]) // yellow (correct number)
				|| numbers[i] === answer[i] // green (correct number and position)
			) {
				drawBorderSquareRadius(
					ctxHightLight,
					xOutSide,
					yOutSide,
					sizeOfOneSquare,
					sizeOfOneSquare,
					radius,
					lineWidth,
					numbers[i] == answer[i] ? '#417642' : '#A48502',
					true
				);
				drawBorderSquareRadius(
					ctxHightLight,
					xInSide,
					yInSide,
					sizeOfOneSquare - lineWidth * 2,
					sizeOfOneSquare - lineWidth * 2,
					radius / 2,
					lineWidth,
					numbers[i] == answer[i] ? '#57AC58' : '#E9BE00',
					true
				);
			}
		}

		// After each guess, you will get additional hints of the number of correct digits (shown on the left) and the number of correct digits (shown on the right).
		let numberRight = 0;
		let numberRightPosition = 0;
		answer.split('').forEach((item, index) => {
			if (numbers.includes(item))
				numberRight++;
			if (item == numbers[index])
				numberRightPosition++;
		});

		ctx.font = fontSuggest;
		ctx.fillText(numberRight, marginX / 2, marginY + sizeOfOneSquare / 2 + heightGameName + tryNumber * (sizeOfOneSquare + distance));
		ctx.fillText(numberRightPosition, marginX + col * (sizeOfOneSquare) + distance * (col - 1) + marginX / 2, marginY + sizeOfOneSquare / 2 + heightGameName + tryNumber * (sizeOfOneSquare + distance));

		if (
			numberRight == answer.length && numberRightPosition == answer.length
			|| tryNumber + 1 == row
		) {
			isWin = numberRight == answer.length && numberRightPosition == answer.length;
			ctx.save();
			ctx.drawImage(canvasHightLight, 0, 0);
			ctx.drawImage(canvasNumbers, 0, 0);

			ctx.font = isWin ? fontResultWin : fontResultLose;
			ctx.fillStyle = isWin ? '#005900' : '#590000';
			// rotate -45 degree
			ctx.globalAlpha = 0.4;
			ctx.translate(canvas.width / 2, marginY + heightGameName + (row * (sizeOfOneSquare + distance)) / 2);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.rotate(-45 * Math.PI / 180);
			ctx.fillText(isWin ? 'YOU WIN' : answer.split('').join(' '), 0, 0);
			ctx.restore();
		}
		else {
			ctx.drawImage(canvasNumbers, 0, 0);
		}
	}

	tryNumber++;

	const imageStream = canvas.createPNGStream();
	imageStream.path = `guessNumber${Date.now()}.png`;

	return {
		...options,
		imageStream,
		ctx,
		canvas,
		tryNumber: tryNumber + 1,
		isWin,
		ctxHightLight,