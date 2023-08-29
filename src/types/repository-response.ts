import { RepositoryAsset } from './repository-asset';

export interface RepositoryResponse {
    data: {
        assets: RepositoryAsset[];
    };
}
