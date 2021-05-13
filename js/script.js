class Tabuleiro{
	criarTabuleiro(){
		let linhas = ['A','B','C','D','E','F','G','H']
		
		for (var i = 0; i < linhas.length; i++) {
			let tr = document.createElement('tr')
			tr.setAttribute('id', `linha-${linhas[i]}`)

			document.getElementById('tabuleiro').appendChild(tr)


			for (var a = 0; a < 8; a++) {
				let td = document.createElement('td')
				td.setAttribute('id', `${linhas[i]}:${a}`)

				document.getElementById(`linha-${linhas[i]}`).appendChild(td)
			}

		}

		for (var i = 0; i < linhas.length; i++) {

			for (var a = 0; a < 8; a++) {
				if(linhas[i] == 'A' || linhas[i] == 'C' || linhas[i] == 'E' || linhas[i] == 'G'){
					if(a%2 == 0){
						document.getElementById(`${linhas[i]}:${a}`).setAttribute('class', 'bg-marrom')
					}else{
						document.getElementById(`${linhas[i]}:${a}`).setAttribute('class', 'bg-bege')
					}
				}else{
					if(a%2 == 1){
						document.getElementById(`${linhas[i]}:${a}`).setAttribute('class', 'bg-marrom')
					}else{
						document.getElementById(`${linhas[i]}:${a}`).setAttribute('class', 'bg-bege')
					}
				}
			}
		}

		this.criarPecas(linhas)

	}

	criarPecas(linhas){
		let pecas = []
		pecas['cima'] = []
		pecas['baixo'] = []

		for (var i = 0; i < linhas.length; i++) {
			for (var a = 0; a < 8; a++) {
				if(((linhas[i] == 'A' || linhas [i] == 'C') && a%2 == 0) || (linhas[i] == 'B' && a%2 == 1)){
					pecas['cima'].push(`${linhas[i]}:${a}`)
				}else if (((linhas[i] == 'G') && a%2 == 0) || ((linhas[i] == 'H' || linhas[i] == 'F') && a%2 == 1)){
					pecas['baixo'].push(`${linhas[i]}:${a}`)
				}
			}
		}

		for (var i = 0; i < pecas['cima'].length; i++) {
			let peca = document.createElement('div')
			peca.setAttribute('class','player2')
			peca.setAttribute('id', `peca-preta-${i}`)
			peca.setAttribute('onclick', `jogo.moverPeca('preta', '${pecas['cima'][i]}', ${i})`)

			document.getElementById(`${pecas['cima'][i]}`).appendChild(peca)

		}

		for (var i = 0; i < pecas['baixo'].length; i++) {
			let peca = document.createElement('div')
			peca.setAttribute('class','player1')
			peca.setAttribute('id', `peca-vermelha-${i}`)
			peca.setAttribute('onclick', `jogo.moverPeca('vermelha', '${pecas['baixo'][i]}', ${i})`)

			document.getElementById(`${pecas['baixo'][i]}`).appendChild(peca)

		}

	}
}

class Jogo{
	constructor(){
		this.linhas = ['A','B','C','D','E','F','G','H']
	}

	moverPeca(cor, posicao, numPeca, rainha){
		this.resetarEscolhas()

		let novaPosicao = []
		novaPosicao['coluna'] = ''
		novaPosicao['linhas'] = []



		if(rainha !== undefined && rainha == true){
			var posicoes = this.mostrarPossibilidades(cor, posicao, rainha)

			for (var i = 0; i < posicoes['baixoEsquerda'].length; i++){ //quanto tem duas divs juntas ele nao consegue andar depois dela, mas arrumar uma solução pra quando tiver div sim div não 
				if(posicoes['baixoEsquerda'][i+1] !== undefined){
					if(document.getElementById(posicoes['baixoEsquerda'][i]).innerHTML.includes('div') && document.getElementById(posicoes['baixoEsquerda'][i+1]).innerHTML.includes('div')){
						console.log('tem duas divs juntas')
						console.log(posicoes['baixoEsquerda'][i] + ' ' + posicoes['baixoEsquerda'][i+1])

						console.log(posicoes['baixoEsquerda'][i+1])

						var pararEsquerda = posicoes['baixoEsquerda'][i+1]

						for (var a = pararEsquerda.length - 1; a < posicoes['baixoEsquerda'].length; a++) {
						 	posicoes['baixoEsquerda'][a] = ''
						}

						break		
					}
				}
			}

			for (var i = 0; i < posicoes['baixoDireita'].length; i++){
				if(posicoes['baixoDireita'][i+1] !== undefined){
					if(document.getElementById(posicoes['baixoDireita'][i]).innerHTML.includes('div') && document.getElementById(posicoes['baixoDireita'][i+1]).innerHTML.includes('div')){
						console.log('tem duas divs juntas')
						console.log(posicoes['baixoDireita'][i] + ' ' + posicoes['baixoDireita'][i+1])
					
					}
				}
			}

			for (var i = 0; i < posicoes['cimaEsquerda'].length; i++){
				if(posicoes['cimaEsquerda'][i+1] !== undefined){
					if(document.getElementById(posicoes['cimaEsquerda'][i]).innerHTML.includes('div') && document.getElementById(posicoes['cimaEsquerda'][i+1]).innerHTML.includes('div')){
						console.log('tem duas divs juntas')
						console.log(posicoes['cimaEsquerda'][i] + ' ' + posicoes['cimaEsquerda'][i+1])
					
					}
				}
			}

			for (var i = 0; i < posicoes['cimaDireita'].length; i++){
				if(posicoes['cimaDireita'][i+1] !== undefined){
					if(document.getElementById(posicoes['cimaDireita'][i]).innerHTML.includes('div') && document.getElementById(posicoes['cimaDireita'][i+1]).innerHTML.includes('div')){
						console.log('tem duas divs juntas')
						console.log(posicoes['cimaDireita'][i] + ' ' + posicoes['cimaDireita'][i+1])
						
					}
				}
			}
			

			let baixoEsquerda = posicoes['baixoEsquerda'].join('/')
			let baixoDireita = posicoes['baixoDireita'].join('/')
			let cimaEsquerda = posicoes['cimaEsquerda'].join('/')
			let cimaDireita = posicoes['cimaDireita'].join('/')

			console.log('baixoEsquerda: ' + baixoEsquerda)
			console.log('cimaEsquerda: ' + cimaEsquerda)
			console.log('baixoDireita: ' + baixoDireita)
			console.log('cimaDireita: ' + cimaDireita)

			let lados = baixoEsquerda+'/'+baixoDireita+'/'+cimaEsquerda+'/'+cimaDireita

			lados = lados.split('/')

			var possibilidades = []
		

			for (var i = 0; i < lados.length; i++) {
				if (lados[i] !== '') {
					possibilidades.push(lados[i])
				}
			}

			for (var i = 0; i < possibilidades.length; i++) {
				if(!document.getElementById(`${possibilidades[i]}`).innerHTML.includes('div')){
					let pos = document.getElementById(`${possibilidades[i]}`)				
					pos.classList.remove('bg-marrom')
					pos.classList.add('bg-azul')
					pos.style.cursor = 'pointer'
				
					pos.setAttribute('onclick', `jogo.clicarPossibilidade('${posicao}', '${possibilidades[i]}', '${numPeca}', '${cor}', ${undefined}, ${true})`)
				}
			}

			console.log(possibilidades)

		}else{
			var possibilidades = this.mostrarPossibilidades(cor, posicao)

			for (var i = 0; i < possibilidades.length; i++) {
				if(!document.getElementById(`${possibilidades[i]}`).innerHTML.includes('div')){
					let pos = document.getElementById(`${possibilidades[i]}`)				
					pos.classList.remove('bg-marrom')
					pos.classList.add('bg-azul')
					pos.style.cursor = 'pointer'
					
					pos.setAttribute('onclick', `jogo.clicarPossibilidade('${posicao}', '${possibilidades[i]}', '${numPeca}', '${cor}')`)
			
				}

				for (var a = 0; a < this.linhas.length; a++) {
					if(document.getElementById(`${possibilidades[i]}`).innerHTML.includes('preta') || document.getElementById(`${possibilidades[i]}`).innerHTML.includes('vermelha')){
						
						if(rainha !== undefined && rainha == true){
							this.mostrarDamaParaComer(possibilidades[i], posicao, cor, numPeca, true)
						}else{
							this.mostrarDamaParaComer(possibilidades[i], posicao, cor, numPeca)
						}
						break
					}
				}
			}

		}
	}

	possibilidadesDamaRainha(possExcluir){

	}

	mostrarDamaParaComer(posicaoPecaComer, posicaoAtual, cor, numPeca, rainha){
		let numeroPosAtual = posicaoAtual.substr(2)
		let numeroPosPecaComer = posicaoPecaComer.substr(2)
		let posicaoLetraNova = this.posicaoLetraNova


		if(numeroPosAtual > numeroPosPecaComer){
			// console.log('esquerda')
			var lado = -2
		}else if(numeroPosAtual < numeroPosPecaComer){
			// console.log('direita')
			var lado = 2
		}
		let numeroPosNovo = parseInt(numeroPosAtual) + lado
		let posicaoComer = posicaoLetraNova + ':' + numeroPosNovo


		if ((cor == 'vermelha' && document.getElementById(posicaoPecaComer).innerHTML.includes('preta')) || (cor == 'preta' && document.getElementById(posicaoPecaComer).innerHTML.includes('vermelha')) ) {
			if(!posicaoComer.includes('undefined')){
				try{
					if(!document.getElementById(posicaoComer).innerHTML.includes('div')){

						let pos = document.getElementById(posicaoComer)

						pos.classList.remove('bg-marrom')
						pos.classList.add('bg-azul')
						pos.style.cursor = 'pointer'

						if(rainha !== undefined && rainha == true){
							pos.setAttribute('onclick', `jogo.clicarPossibilidade('${posicaoAtual}', '${posicaoComer}', '${numPeca}', '${cor}', '${posicaoPecaComer}', ${true})`)
						}else{
							pos.setAttribute('onclick', `jogo.clicarPossibilidade('${posicaoAtual}', '${posicaoComer}', '${numPeca}', '${cor}', '${posicaoPecaComer}')`)
						}

					}
				}catch(e){
					// console.log('bug arrumado')
				}
			}
		}	
	}

	mostrarPossibilidades(cor, posicao, rainha){
			if(cor === 'vermelha'){
			var add = -1
			}else{
				var add = 1
			}

		for (var i = 0; i < this.linhas.length; i++) {
			if(posicao.includes(this.linhas[i])){

				if(rainha !== undefined){
					console.log(posicao)

					let posicoes = []
					posicoes['cimaEsquerda'] = []
					posicoes['cimaDireita'] = []
					posicoes['baixoEsquerda'] = []
					posicoes['baixoDireita'] = []

					//baixoEsquerda
					for (var i = 0; i < this.linhas.length; i++) {
						let linha = posicao.substr(0,1)
						var numero = parseInt(posicao.substr(2))


						if(this.linhas[i] == linha){
							let a = i

							do{
								numero = numero - 1

								var listaLinhas = this.linhas[a+1] + ':' + numero
								if(this.linhas[a+1] !== undefined && numero >= 0){
									posicoes['baixoEsquerda'].push(listaLinhas)
								}
								a++
							}while(a < this.linhas.length)
							
						}
					}

					//cimaEsquerda
					for (var i = 0; i < this.linhas.length; i++) {
						let linha = posicao.substr(0,1)
						var numero = parseInt(posicao.substr(2))


						if(this.linhas[i] == linha){
							let a = i

							do{
								numero = numero - 1

								var listaLinhas = this.linhas[a-1] + ':' + numero
								if(this.linhas[a-1] !== undefined && numero >= 0){
									posicoes['cimaEsquerda'].push(listaLinhas)
								}
								a--
							}while(a > 0)
							
						}
					}

					//baixoDireita
					for (var i = 0; i < this.linhas.length; i++) {
						let linha = posicao.substr(0,1)
						var numero = parseInt(posicao.substr(2))


						if(this.linhas[i] == linha){
							let a = i

							do{
								numero = numero + 1

								var listaLinhas = this.linhas[a+1] + ':' + numero
								if(this.linhas[a+1] !== undefined && numero <= 7){
									posicoes['baixoDireita'].push(listaLinhas)
								}
								a++
							}while(a < this.linhas.length)
							
						}
					}

					//cimaDireita
					for (var i = 0; i < this.linhas.length; i++) {
						let linha = posicao.substr(0,1)
						var numero = parseInt(posicao.substr(2))


						if(this.linhas[i] == linha){
							let a = i

							do{
								numero = numero + 1

								var listaLinhas = this.linhas[a-1] + ':' + numero
								if(this.linhas[a-1] !== undefined && numero <= 7){
									posicoes['cimaDireita'].push(listaLinhas)
								}
								a--
							}while(a > 0)
							
						}
					}

					return posicoes

				}else{
					posicao = posicao.replace(this.linhas[i], this.linhas[i+(add)])
					var linha = posicao.substr(0,1)
					var numero = parseInt(posicao.substr(2))

					this.posicaoLetraNova = this.linhas[i+(add*2)]


				}
				
				break
			}
		}

		let possibilidades = []

		switch(numero){
			case 0:
				possibilidades.push(1)
				break
			case 1:
				possibilidades.push(0)
				possibilidades.push(2)
				break
			case 2:
				possibilidades.push(1)
				possibilidades.push(3)
				break
			case 3:
				possibilidades.push(2)
				possibilidades.push(4)
				break
			case 4:
				possibilidades.push(3)
				possibilidades.push(5)
				break
			case 5:
				possibilidades.push(4)
				possibilidades.push(6)
				break
			case 6:
				possibilidades.push(5)
				possibilidades.push(7)
				break
			case 7:
				possibilidades.push(6)
				break						
		}

		let posicoesNovas = []

		for (var i = 0; i < possibilidades.length; i++) {
			posicoesNovas.push(`${linha}:${possibilidades[i]}`)
		}

		return posicoesNovas

	}

	clicarPossibilidade(posVelha, posNova, numPeca, cor, posicaoPecaComer, rainha){
		let player = 1
		let pecaVelha = document.getElementById(posVelha)
		this.resetarEscolhas()

		pecaVelha.innerHTML = ''

		if(posicaoPecaComer !== undefined){ //comer peça
			document.getElementById(posicaoPecaComer).innerHTML = ''
		}

		if(cor == 'preta'){
			player = 2
		}

		let pecaNova = document.createElement('div')
		pecaNova.setAttribute('class',`player${player}`)
		pecaNova.setAttribute('id', `peca-${cor}-${numPeca}`)
		pecaNova.setAttribute('onclick', `jogo.moverPeca('${cor}', '${posNova}', ${numPeca}, ${rainha})`)

		document.getElementById(`${posNova}`).appendChild(pecaNova)

		this.verificarDamaRainha(posNova, cor, numPeca)

	}

	verificarDamaRainha(posicao, cor, numPeca){

		let player = 1

		if(cor == 'preta'){
			player = 2
		}

		if(posicao.includes('A') || posicao.includes('H')){
			document.getElementById(`${posicao}`).innerHTML = ''

			console.log( cor + 'virou rainha')
			console.log(posicao, cor)

			let pecaNova = document.createElement('div')
			pecaNova.setAttribute('class',`player${player}`)
			pecaNova.setAttribute('id', `peca-${cor}-${numPeca}`)
			pecaNova.setAttribute('onclick', `jogo.moverPeca('${cor}', '${posicao}', ${numPeca}, ${true})`)

			document.getElementById(`${posicao}`).appendChild(pecaNova)

		}
		
	}

	resetarEscolhas(){
		for (var i = 0; i < this.linhas.length; i++) {
			for (var a = 0; a < 8; a++) {
				document.getElementById(`${this.linhas[i]}:${a}`).classList.remove('bg-azul')				
				document.getElementById(`${this.linhas[i]}:${a}`).classList.add('bg-marrom')

				document.getElementById(`${this.linhas[i]}:${a}`).removeAttribute('onclick')
				document.getElementById(`${this.linhas[i]}:${a}`).style.cursor = ''

			}
		}
	}
}

tabuleiro = new Tabuleiro()
tabuleiro.criarTabuleiro()

jogo = new Jogo()

