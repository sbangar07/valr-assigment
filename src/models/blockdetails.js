export class SingleBlock {
  constructor(
    Hash,
    Confirmation,
    Timestamp,
    Heigh,
    Miner,
    NoOfTransaction,
    Difficulty,
    MarketRoot,
    Version,
    Bits,
    Weight,
    Size,
    Nonce,
    TransactionVolumn,
    BlockReward,
    FeeReward
  ) {
    this.Hash = Hash;
    this.Confirmation = Confirmation;
    this.Timestamp = Timestamp;
    this.Heigh = Heigh;
    this.Miner = Miner;
    this.NoOfTransaction = NoOfTransaction;
    this.Difficulty = Difficulty;
    this.MarketRoot = MarketRoot;
    this.Version = Version;
    this.Bits = Bits;
    this.Weight = Weight;
    this.Size = Size;
    this.Nonce = Nonce;
    this.TransactionVolumn = TransactionVolumn;
    this.FeeReward = FeeReward;
    this.BlockReward = BlockReward;
  }
}
