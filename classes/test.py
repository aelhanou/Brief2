import time
import requests

addr = ["0x064c8e55aa484adbd58ca2d43343ef50137473b7","0x4954e0062e0a7668a2fe3df924cd20e6440a7b77","0x4673f018cc6d401aad0402bdbf2abcbf43dd69f3","0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a","0x1ce0c2827e2ef14d5c4f29a091d735a204794041"]





for i in addr:
         
    url = 'https://deep-index.moralis.io/api/v2/'+i+'/erc20?chain=bsc'

    headers = {
                    'accept' : 'application/json',
                'x-api-key'  : 'PAgDu79aA85mohvRYl1ln87hjkWLD6fRtmKOmpQkmrtTF2CX9xeZYXCFGu2ZuWxp'
                }
    time.sleep(10)
    response = requests.get(url , headers=headers).json()

    # reserve0 = int(response["reserve1"]) / (10**18)
    # reserve1 = int(response["reserve0"]) / (10**18)
    token = response["token_address"]
    dicimal = response["decimals"]

    outfile = 'reserves.txt'

    f = open(outfile, 'a')
    
    f.write('\n')
    f.write("token address = ") , f.write(str(token)), f.write("dicimal = ") , f.write(str(dicimal))
    f.write('\n')
    
    # f.write("\n")

    print("token address  = ", token) , print("dicimal = ", dicimal)
    

    # print(response)


            