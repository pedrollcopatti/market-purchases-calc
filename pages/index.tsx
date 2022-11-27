import { FormEvent, useEffect, useState } from 'react'
import { Spacer, Flex, Input, Button, Stack, Heading, Text, InputGroup, InputLeftElement, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react'

export default function Home() {
  const [purchases, setPurchases] = useState<number[]>([])
  const [currentPurchase, setCurrentPurchase] = useState<string>('')

  function addInArray(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();
    setPurchases([...purchases, (Number(currentPurchase.replace(',', '.')) / 2)])
  }

  function calculateTotal() {
    let total: number = 0

    purchases.forEach(p => {
      total = total + p;
    })
    return total.toFixed(2)
  }

  return (
    <Flex width='100%' height='100vh' align='center' justify='center' as='form' onSubmit={(e) => addInArray(e)}>
      <Stack spacing={12}>
        <Heading textAlign='center' size='lg' textColor='blue.500'>Compras mercado</Heading>

        <Stack direction='row' >
          <InputGroup width={125}>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              children='R$'
            />
            <Input _placeholder={{ color: 'gray.300' }} placeholder='00.00' onChange={(e) => setCurrentPurchase(e.target.value)} />
          </InputGroup>
          <Button colorScheme='blue' type='submit'>Dividir e adicionar</Button>
        </Stack>
        <Flex>
          <Stat>
          <StatLabel>Você deve:</StatLabel>
            <StatNumber>R${calculateTotal()}</StatNumber>
            <StatHelpText>
              <StatArrow type='increase' />
              R${purchases.at(-1)?.toFixed(2)}
            </StatHelpText>
          </Stat>
          <Stack align='start' >
            <Text fontSize='sm' textColor={'gray.300'}>Valores adicionados:</Text>
           <Stack width={'100%'} padding={4} height={24} overflow='auto' style={{scrollbarWidth: 'thin'}}>
           {purchases.map((p, key) => {
              return <Text  textColor={'gray.300'} key={key}>R${p.toFixed(2)}</Text>
            })}
           </Stack>
          </Stack>
        </Flex>
      </Stack>

    </Flex>
  )
}
