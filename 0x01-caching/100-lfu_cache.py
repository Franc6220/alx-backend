#!/usr/bin/env python3
""" LFUCache module """
from base_caching import BaseCaching

class LFUCache(BaseCaching):
    """ LFUCache class that implements a LFU caching system """

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.frequency = {}
        self.order = {}

    def put(self, key, item):
        """ Add an item in the cache using LFU """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.order.remove(key)
            self.cache_data[key] = item
            self.frequency[key] = self.frequency.get(key, 0) + 1
            self.order.append(key)

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                min_freq = min(self.frequency.values())
                min_freq_keys = [k for k, v in self.frequency.items() if v == min_freq]

                # If multiple keys have the same frequency, use LRU to discard
                if len(min_freq_keys) > 1:
                    lru_key = min_freq_keys[0]
                    for k in min_freq_keys:
                        if self.order.index(k) < self.order.index(lru_key):
                            lru_key = k
                    discard_key = lru_key
                else:
                    discard_key = min_freq_keys[0]

                del self.cache_data[discard_key]
                del self.frequency[discard_key]
                self.order.remove(discard_key)
                print(f"DISCARD: {discard_key}")

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None
        self.frequency[key] = self.frequency.get(key, 0) + 1
        self.order.remove(key)
        self.order.append(key)
        return self.cache_data[key]
