#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

        def dataset(self) -> List[List]:
            """Cached dataset"""
            if self.__dataset is None:
                with open(self.DATA_FILE) as f:
                    reader = csv.reader(f)
                    dataset = [row for row in reader]
                    self.__dataset = dataset[1:]
                    return self.__dataset

                def indexed_dataset(self) -> Dict[int, List]:
                    """Dataset indexed by sorting position, starting at 0"""
                    if self.__indexed_dataset is None:
                        dataset = self.dataset()
                        self.__indexed_dataset = {
                                i: dataset[i] for i in range(len(dataset))
                                }
                        return self.__indexed_dataset

                    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
                        """Returns a dictionary of deletion-resilient pagination data"""
                        # Ensure that the index is within a valid range
                        assert index is not None and 0 <= index < len(self.indexed_dataset())

                        # Create a list of valid indexes, skipping any that have been deleted
                        dataset = self.indexed_dataset()
                        indexes = sorted(dataset.keys())

                        # Start from the given index and collect the next `page_size` elements
                        data = []
                        next_index = index
                        for i in range(page_size):
                            # Ensure we are within bounds
                            if next_index >= len(indexes):
                                break

                            # Add the data and move to the next index
                            data.append(dataset[indexes[next_index]])
                            next_index += 1

                            # Determine the next index after the current page
                            next_index = indexes[next_index] if next_index < len(indexes) else None

                            # Prepare and return the dictionary
                            return {
                                    "index": index,
                                    "data": data,
                                    "page_size": len(data),
                                    "next_index": next_index
                                    }
