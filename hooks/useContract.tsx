import { client, chainId } from "@/lib/constants"
import { getContract } from "thirdweb";

const useContract = ({address}: {address :string}) => {
    const contract = getContract({
        client,
        chain: chainId,
        address: address,
      });

    return { contract }
}

export default useContract;